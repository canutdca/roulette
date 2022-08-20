Feature: Get a only one group

	Scenario: Get a valid list of groups
		Given a course with id "0affe324-8d27-11ec-b909-0242ac120002" already exists
		When I send a GET request to "/groups/0affe324-8d27-11ec-b909-0242ac120002"
		Then the response status code should be 200
		And the response should not be empty
