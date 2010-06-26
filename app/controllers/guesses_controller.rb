class GuessesController < ApplicationController
  # GET /guesses
  # GET /guesses.xml
  def index
    @guesses = Guess.all

    respond_to do |format|
      format.html # index.html.erb
      format.xml  { render :xml => @guesses }
    end
  end

  # GET /guesses/1
  # GET /guesses/1.xml
  def show
    @guess = Guess.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.xml  { render :xml => @guess }
    end
  end

  # GET /guesses/new
  # GET /guesses/new.xml
  def new
    @guess = Guess.new

    respond_to do |format|
      format.html # new.html.erb
      format.xml  { render :xml => @guess }
    end
  end

  # GET /guesses/1/edit
  def edit
    @guess = Guess.find(params[:id])
  end

  # POST /guesses
  # POST /guesses.xml
  def create
    @guess = Guess.new(params[:guess])

    respond_to do |format|
      if @guess.save
        flash[:notice] = 'Guess was successfully created.'
        format.html { redirect_to(@guess) }
        format.xml  { render :xml => @guess, :status => :created, :location => @guess }
      else
        format.html { render :action => "new" }
        format.xml  { render :xml => @guess.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /guesses/1
  # PUT /guesses/1.xml
  def update
    @guess = Guess.find(params[:id])

    respond_to do |format|
      if @guess.update_attributes(params[:guess])
        flash[:notice] = 'Guess was successfully updated.'
        format.html { redirect_to(@guess) }
        format.xml  { head :ok }
      else
        format.html { render :action => "edit" }
        format.xml  { render :xml => @guess.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /guesses/1
  # DELETE /guesses/1.xml
  def destroy
    @guess = Guess.find(params[:id])
    @guess.destroy

    respond_to do |format|
      format.html { redirect_to(guesses_url) }
      format.xml  { head :ok }
    end
  end
end
