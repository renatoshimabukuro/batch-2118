def acronym(sentence) # 'what the hell'
  # TODO: make the sentence into an acronym
  # separate the words into an array ['what', 'the', 'hell']
  words = sentence.split
  result = ''
  # start iterating over each words
  for word in words
    # on each iteration, get the first character of the word
    first_character = word[0]
    # capitalize the character, concatenate into a single acronymized string
    result += first_character.upcase
  end
  result
end

def acronym_v2(sentence)
  # separate the words into an array ['what', 'the', 'hell']
  words = sentence.split
  first_characters = []
  # start iterating over each words
  words.each do |word|
    # put the first character (upcased) of the word into first characters array
    first_characters << word[0].upcase
  end

  # join them later
  first_characters.join
end
