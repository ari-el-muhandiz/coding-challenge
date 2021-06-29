def card_distributions(cardTypes)
    # check if the lenght is 1
    if cardTypes.length == 1 
        if cardTypes[0] % 2 == 0 || cardTypes[0] % 3 == 0 || cardTypes[0] % 5 == 0
            return 0
        end
    end
    additional_card = 0
    minimum_card = cardTypes[0]
    cardTypes.each do |card|
        if card % 2 != 0
            additional_card += 1
        end
        if card < minimum_card
            minimum_card = card
        end
    end

    # check if the all card can be divided by minimum card
    is_can_divided_by_minimum_card = cardTypes.all? {|card| card % minimum_card == 0}
    is_can_divided_by_minimum_card ? 0 : additional_card
end


puts(card_distributions([12345]))
puts(card_distributions([5, 10, 15, 20, 25, 5]))
puts(card_distributions([3, 4, 7, 9, 10, 11]))