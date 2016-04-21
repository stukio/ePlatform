class CoursesController < ApplicationController
  before_action :check_if_admin, :only => [:create, :update, :edit, :destroy]

  def index
    @courses = Course.all
    render json: @courses
  end

  def show
    @course = Course.find(params[:id])
    render json: @course
  end

  def create
    @course = Course.new(course_params)
    if @course.save
      render json: @course
    end
  end

  def update
    @course = Course.find(params[:id])

    if @course.update(course_params)
      render json: @course
    end
  end

  def destroy
    @course = Course.find(params[:id])
    @course.destroy
    render json: @course
  end


  private

  def course_params
    params.require(:course).permit(:name, :description, :thumbnail)
  end


  def check_if_admin
    if current_user
      head(403) unless current_user.admin?
    end
  end


end