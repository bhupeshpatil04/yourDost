# DSA – Second Largest Unique Number (Python)

## Problem
Given an array of integers, return the second largest unique number.  
If it doesn’t exist, return -1.

## Approach (O(n))
We maintain two variables:
- `first` → largest unique number
- `second` → second largest unique number

We do a single pass through the list and update them as needed.

## How to Run
```
python3 solution.py
```

Then enter input like:
```
3 5 2 5 6 6 1
```

## Sample
Input:
```
[3, 5, 2, 5, 6, 6, 1]
```
Output:
```
5
```
