def second_largest_unique(nums):
    first = float('-inf')
    second = float('-inf')

    for x in nums:
        if x > first:
            second = first
            first = x
        elif first > x > second:
            second = x

    return second if second != float('-inf') else -1


# User Input
user_input = input("Enter numbers separated by space or comma: ")
user_input = user_input.replace("[", "").replace("]", "").replace(",", " ")
nums = list(map(int, user_input.split()))

print("Second largest unique number:", second_largest_unique(nums))
