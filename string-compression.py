def compress(chars: [str]) -> int:    
        i = 0
        j = 0
        k = 0
        while i < len(chars):
            while j < len(chars) and chars[i] == chars[j]:
                j+=1
            
            chars[k] = chars[i]
            k+=1
         
            if (j - i) > 1:
                num_chars = str(j - i)
                for char in num_chars:
                    chars[k] = char
                    k += 1
                  
            i = j 
        return k
lst = ["a","a","b","b","c","c","c"]
idx = compress(lst)
print(lst[:idx])