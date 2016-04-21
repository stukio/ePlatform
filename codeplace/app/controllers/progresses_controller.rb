class ProgressesController < ApplicationController

  before_filter :authenticate_user!

  def show
    progresses = Progress.where(user_id: current_user.id).map(&:chapter_id)
    course_chapters = Course.find(params[:course_id]).chapters
    completed_chapters = Course.find(params[:course_id]).chapters.where(id: progresses)
    completed_chapters = completed_chapters.each{|c| c.completed = true}
    chapters = course_chapters - @course_chapters.where(id: progresses)
    final = chapters + completed_chapters
    render json: final.sort_by!(&:id)
  end


  def create
    @progress = Progress.create(
      :user_id => current_user.id,
      :chapter_id => params[:chapter_id]
    )
    render json: { progress: @progress }
  end 


  def delete
    @progress = Progress.where("user_id = ? AND chapter_id = ?", current_user.id, params[:chapter_id])
    @progress.first.destroy
    render json: @progress
  end


end