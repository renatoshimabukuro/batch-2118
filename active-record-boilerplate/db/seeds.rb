# This is where you can create initial data for your app.
doctor = Doctor.new(first_name: "Gregory", last_name: "House")
doctor.save

intern = Intern.new(first_name: "Allison", last_name: "Cameron")
intern.doctor = doctor
intern.save
