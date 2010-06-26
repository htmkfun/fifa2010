require 'test_helper'

class GuessesControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:guesses)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create guess" do
    assert_difference('Guess.count') do
      post :create, :guess => { }
    end

    assert_redirected_to guess_path(assigns(:guess))
  end

  test "should show guess" do
    get :show, :id => guesses(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => guesses(:one).to_param
    assert_response :success
  end

  test "should update guess" do
    put :update, :id => guesses(:one).to_param, :guess => { }
    assert_redirected_to guess_path(assigns(:guess))
  end

  test "should destroy guess" do
    assert_difference('Guess.count', -1) do
      delete :destroy, :id => guesses(:one).to_param
    end

    assert_redirected_to guesses_path
  end
end
