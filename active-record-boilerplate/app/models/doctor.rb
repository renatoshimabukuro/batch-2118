class Doctor < ActiveRecord::Base
  has_many :interns
  has_many :consultations

  has_many :patients, through: :consultations

  #validates
  validates :last_name, presence: true
  # validates first name and last name
  validates :first_name, uniqueness: { scope: :last_name }
end
