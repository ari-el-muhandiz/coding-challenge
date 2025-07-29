require 'set'

class AlienLang
    def initialize(words)
        @words = words
        @visited = Set.new()
        @wordDic = {}
        @sorted = []
        translateLang
    end

    def printWord
        return @sorted.join("")
    end

    private
    def translateLang
        #build dictionary of word   
        for i in (1..@words.length - 1) do
            prev = @words[i-1]
            current = @words[i]
            minLength = [prev.length, current.length].min
            for i in (0..minLength - 1) do
                word1 = prev[i]
                word2 = current[i]
                if word1 != word2
                    if @wordDic.has_key?(word1) 
                        @wordDic[word1].append(word2)  
                    else
                        @wordDic[word1] = [word2]
                    end
                    break
                end
            end
        end
        for key in @wordDic.keys do
            if @visited.include?(key)
                next
            end
            dfs(key)
        end
    end
    
    def dfs(key)
        @visited.add(key)
        if @wordDic[key]
            @wordDic[key].each do |word|
             if @visited.include?(word)
                 next
             end
             dfs(word)
           end
        end
        @sorted.unshift(key)
     end
end