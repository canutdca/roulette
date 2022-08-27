Feature: Delete Group

	Scenario: Delete group
		Given a course with id "0affe324-8d27-11ec-b909-0242ac120002" already exists
		When I send a DELETE request to "/groups/0affe324-8d27-11ec-b909-0242ac120002"
		Then the response status code should be 200
		And I send a GET request to "/groups/0affe324-8d27-11ec-b909-0242ac120002"
		And the response status code should be 204

