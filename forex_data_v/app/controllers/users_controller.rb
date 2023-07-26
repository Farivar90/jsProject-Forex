class UsersController < ApplicationController
    def index
      @users = User.all
      render :index
    end
  
    def show
      @user = User.find_by(id: params[:id])
      render :show
    end
  
    def new
      @user = User.new 
      render :new
    end
  
    def create 
      @user = User.new(user_params)
      if @user.save
        redirect_to user_url(@user.id)
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end
  
    def edit
      @user = User.find_by(id: params[:id])
      render :edit
    end
  
    def update
      @user = User.find_by(id: params[:id])
      if @user.update(user_params)
        flash[:notice] = ['User successfully updated']
        redirect_to user_url(@user.id)
      else
        render :edit
      end
    end
  
    def destroy
      user = User.find_by(id: params[:id])
      user.destroy
      render json: user
    end
  
    private
    def user_params
      params.require(:user).permit(:username, :email, :age, :coding_pref, :password)
    end
  end
  