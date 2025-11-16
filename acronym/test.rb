require_relative 'acronym'

# TDD
# Test Driven Development

puts 'passed' if acronym('united kingdom') == 'UK'
puts 'passed' if acronym('hong kong') == 'HK'
puts 'passed' if acronym('central intelligence agency') == 'CIA'
puts 'passed' if acronym('what the hell') == 'WTH'
puts 'passed' if acronym('good game') == 'GG'
puts 'passed' if acronym('role playing game') == 'RPG'
puts 'passed' if acronym('hello') == 'H'

puts acronym_v2('united kingdom')
puts acronym_v2('hong kong')
puts acronym_v2('central intelligence agency')
puts acronym_v2('what the hell')
puts acronym_v2('good game')
puts acronym_v2('role playing game')
puts acronym_v2('hello')
