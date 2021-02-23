
def mergeSort(lst):
    if len(lst) > 1:
        mid = len(lst) // 2
        left = lst[:mid]
        right = lst[mid:]

        mergeSort(left)
        mergeSort(right)
        l = r = c = 0
        while l < len(left) and r < len(right):
            if left[l] < right[r]:
                lst[c] = left[l]
                l += 1
            else:
                lst[c] = right[r]
                r += 1
            c += 1
       
        while l < len(left):
            lst[c] = left[l]
            l += 1
            c += 1
        
        while r < len(right):
            lst[c] = right[r]
            r += 1
            c += 1
        
        




if __name__ == '__main__':
    A = [7, 2, 9, 3, 1, 6, 7, 8, 4]
    mergeSort(A)
    print (A)