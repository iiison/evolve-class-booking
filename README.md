# evolve-class-booking

So, I need to book my gym class two days in advance. They open the booking at 10:15 pm daily. I usually go to sleep around 9:30 pm. And when I try to book my class in the morning, all the slots are always taken for the 6 pm class. This is a small node server that:
- Logs me out at 9:30 pm (to make sure I have an active session key)
- Sings me in
- Makes `book class slot` API call at 10:15 pm.

Suck it, people.
