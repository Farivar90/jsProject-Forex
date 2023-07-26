class SessionsController < ApplicationController

    before_action :require_logged_in, only: [:destroy]
    def new
        @user = User.new
        render :new
    end

    def create
        usr= params[:user][:username]
        pass = params[:user][:password]
        @user = User.find_by_credentials(usr, pass)
        if @user
            login!(@user)
            redirect_to 
        else
            @user = User.new(username: usr)
            flash.now[:errors] = ["Invalid username or password"]
            render :new
        end
    end

    def destroy
        logout!
        redirect_to new_session_url
    end

end