class User < ApplicationRecord
    validates :username, :session_token, presence: true, uniqueness: true
    validates :password_digest, presence: true
    validates :password, length: {minimum: 6, allow_nil: true}
    before_validation :ensure_session_token

    attr_reader :password

    def self.find_by_credentials(username, password)
        user = User.find_by(username: username)
        user&.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = generate_token
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= generate_token
    end

    private

    def generate_token
        loop do
            token = SecureRandom::urlsafe_base64
            return token unless User.exists?(session_token: token)
        end
    end
end
