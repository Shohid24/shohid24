# by claude llm
def getNthCombination(n: int) -> str:
    """
    Returns the nth possible 3-letter combination using lowercase letters a-z.

    Args:
        n: Index of the combination (0 to 26^3 - 1)

    Returns:
        str: The nth 3-letter combination

    Raises:
        ValueError: If n is outside the valid range
    """
    # Check if n is within valid range
    max_combinations = 26**3
    if n < 0 or n >= max_combinations:
        raise ValueError(f"Index must be between 0 and {max_combinations - 1}")

    letters = "abcdefghijklmnopqrstuvwxyz"
    result = []

    # Convert to base 26 for 3 letters
    for _ in range(3):
        n, remainder = divmod(n, 26)
        result.append(letters[remainder])

    # Reverse and join the result
    return "".join(reversed(result))
