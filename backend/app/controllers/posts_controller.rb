class PostsController < ApplicationController
    before_action :set_post, only: [:show, :update, :destroy]
    include ColorHelper
  
    # GET /posts
    def index
        @posts = Post.includes(:reactions).order(created_at: :desc).page(params[:page]).per(10)
        total_pages = @posts.total_pages
        render json: {
          posts: @posts.as_json(include: :reactions),
          total_pages: total_pages
        }
      end
  
    # GET /posts/1
    def show
      render json: @post
    end
  
    # POST /posts
    def create
        @post = Post.new(post_params)
        if @post.save
          render json: @post, status: :created
        else
          render json: @post.errors, status: :unprocessable_entity
        end
      end
  
    # PATCH/PUT /posts/1
    def update
      if @post.update(post_params)
        render json: @post
      else
        render json: @post.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /posts/1
    def destroy
      @post.destroy
    end

    def search_by_color
        target_color = "##{params[:color]}"
        similarity_threshold = params[:threshold].to_i || 100
      
        @posts = Post.all.sort_by { |post| color_similarity(post.color_code, target_color) }.first(10)

      
        if @posts.empty?
          logger.info("データがありません: #{target_color}")
        else
          logger.info(" #{@posts.count}件の投稿があります: #{target_color}")
        end
      
        render json: @posts.as_json(include: :reactions)
      end
  
    private
      def set_post
        @post = Post.find(params[:id])
      end
  
      def post_params
        params.require(:post).permit(:author_name, :content, :color_code, :color_name, :era)
      end
  end
  