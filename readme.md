# Roulette
This utility is thought as a solution to when our teams need to alternate responsable person for diferent ceremonies.

# Motive
In our day-to-day, my Squad goes several ceremonies which need a responsable/moderator.

Actually, we use a Roulete (www.google.com). In this site, you can put a list of persons (member of team) and you can cross out these (por example, you can cross out the persons that have already left)
This site use a cookies by save the list of persons that you created. Thanks to this, you can use this site week by week.

But this have any problems:
- If you want have more than 1 rulette, you need that other person creates a new rulette. For example: you need one roulette for Dailys, other by Refinments...
- If the creator (person what have a cookies) is on vacation, sick, in another meeting... you can not use the roulette!

# Solution
I propose a web app which every Squad can put entry your members and generate differents roulettes. This roulettes will be stored into a database, file... I i can assure you that it will not depend on anyone's cookies.

# Technologies
Backend: Node
Frontend: React

# To achieve this
We develop differents iterations:

1. Show List of Groups
2. View Detail of Group
3. Create Group
4. Update Group: GroupName
5. Update Group: Update Member
6. Update Group: Add Member
7. Update Group: Delete Member
8. Create Ceremony
9. Update Ceremony: CeremonyName
10. Update Ceremony: AvailableToUnavailable
11. Update Ceremony: UnavailableToAvailable
12. Update Ceremony: Play and assign
12. Update Ceremony: Reset
13. Ceremony: Play and repeat
14. Delete Ceremony from Ceremony Detail
15. Delete Ceremony from Group Detail
16. Delete Group from Group Detail
17. Delete Group from Home
18. Validations

# Models:
- Group: 'Name', 'Members' and 'Ceremonies'
- Ceremony: 'Name', 'CurrentResponsable', 'Availables', 'Unavailables'

# When we finished the app, we will have to differents use cases:
## a) Create a Group:
	1. User go to Home.
	2. Select create button.
	3. Enter the Squad's name.
	4. Next button.
	5. Enter the list of members.
	6. Press finish when finish.
	This, create a Group with its members and go to detail of Group.

## b) Update Group:
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Change group name, delete members, add members and update members.
	This, update a Group.

## c) Create ceremony into a Group
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Select "New Ceremony".
	5. Enter name of ceremony.
	This, create a ceremony into Group and go to detail of Ceremony.

## d) Go to the Ceremony
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	This, you can see the roulette, current responsable and a list of members availables and unavailables. Inside the roulette, only show the available members.

## e) Change member available to unavailable into Ceremony
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Move the user available to unavailable.
	This, you can move users from the available list to unavailable list.

## f) Change member unavailable to available into Ceremony
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Move the user unavailable to available.
	This, you can move users from the unavailable list to available list.

## g) Play Roulette and assign responsable
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Press "Play" button.
	7. After the roulette's animation and show the new Responsable, press "Assign" button.
	This, the new Responsable is assigned and update list of available and unavailable members.

## h) Play Roulette and repeat
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Press "Play" button.
	7. After the roulette's animation and show the new Responsable, press "Repeat" button.
	This, the roulette triggered again.

## i) Reset Ceremony
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Press "Reset" button.
	This, all users will go to available list, CurrentResponsable will be empty and will show Roulette with all members.

## j) Delete Ceremony from Ceremony Detail
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Select the desired Ceremony.
	6. Press "Delete" button.
	7. Write name of Ceremony.
	This, ceremony is deleted and go Group..

## j) Delete Ceremony from Group Detail
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Search a Ceremony with searcher.
	5. Press "Delete" button from the desired Ceremony.
	6. Write name of Ceremony.
	This, ceremony is deleted and remove this to the current view.

## k) Delete Group from Group detail
	1. User go to Home.
	2. Search a group with searcher.
	3. Select the desired group.
	4. Press "Delete" button.
	5. Write name of Group.
	This, Group is deleted and go to home.

## k) Delete Group from Home
	1. User go to Home.
	2. Search a group with searcher.
	3. Press "Delete" button from the desired Group.
	4. Write name of Group.
	This, Group is deleted and remove this to the current view.
