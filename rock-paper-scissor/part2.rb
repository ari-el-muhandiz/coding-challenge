require 'debugger'

class WrongNumberOfPlayersError < StandardError ; end
class NoSuchStrategyError < StandardError ; end

def rps_result(m1, m2)
  # YOUR CODE HERE
  if m1[1] == m2[1]
    [ m1[0], m1[1] ]
  elsif m1[1] =~ /R/i && m2[1] =~ /P/i
    [ m2[0], m2[1] ]
  elsif m1[1] =~ /R/i  && m2[1] =~ /S/i
    [ m1[0], m1[1] ]
  elsif m1[1] =~ /P/i && m2[1] =~ /R/i
    [ m1[0], m1[1] ]
  elsif m1[1] =~ /P/i && m2[1] =~ /S/i
    [ m2[0], m2[1] ]
  elsif m1[1] =~ /S/i && m2[1] =~ /R/i
    [ m2[0], m2[1] ]
  elsif m1[1] =~ /S/i && m2[1] =~ /P/i
    [ m1[0], m1[1] ]
  end
end

def rps_game_winner(game)
  # YOUR CODE HERE
  if game.length != 2
    raise WrongNumberOfPlayersError
  elsif game.select {|x| x[1] !~ /R|S|P/i }.length > 0
    raise NoSuchStrategyError 
  else
    rps_result(game[0], game[1])
  end
end

def rps_tournament_winner(tournament)
  # YOUR CODE HERE
  return rps_game_winner(tournament) unless tournament.first.first.class == Array
  mid = (tournament.length / 2).round
  l, r = [tournament.take(mid), tournament.drop(mid)]
  ls = rps_tournament_winner(l.first)
  rs = rps_tournament_winner(r.first)
  combine = rps_tournament_winner( [rs] + [ls] )
end

tournament = [
    [
        [ ["Armando", "P"], ["Dave", "S"] ],
        [ ["Richard", "R"],  ["Michael", "S"] ],
    ],
    [
        [ ["Allen", "S"], ["Omer", "P"] ],
        [ ["David E.", "R"], ["Richard X.", "P"] ]
    ]
]

tournament2 = [
  [
    [
      [["Earle", "P"], ["Syed", "S"]], 
      [["Aedus", "P"], ["Jasper", "P"]]
    ], 
    [
      [["Giles", "P"], ["Hillary", "P"]], 
      [["Kenney", "R"], ["Mose", "P"]]
    ]], [[[["Tyron", "R"], ["Conor", "S"]], [["Kirill", "S"], ["Eliseo", "R"]]], [[["Walker", "R"], ["Milos", "S"]], [["Tyson", "R"], ["Amphitryon", "P"]]
    ]
  ]
]
p rps_tournament_winner(tournament2)
