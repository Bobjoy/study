class Player
  def play_turn(warrior)
    # add your code here
    
    # level1
    #warrior.walk!
    
    # level2
    '''
    if warrior.feel.empty?
      warrior.walk!
    else
      warrior.attack!
    end
    '''
    
    # level3
    if warrior.feel.empty?
      if warrior.health < 20
        warrior.rest!
      else
        warrior.walk!
      end
    else
      warrior.attack!
    end
    
  end
end