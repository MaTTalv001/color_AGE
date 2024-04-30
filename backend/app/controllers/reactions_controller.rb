class ReactionsController < ApplicationController
    def create
      @post = Post.find(params[:post_id])
      @reaction = @post.reactions.build(reaction_params)
  
      if @reaction.save
        render json: @reaction, status: :created
      else
        render json: @reaction.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def reaction_params
      params.require(:reaction).permit(:color_code)
    end
  end