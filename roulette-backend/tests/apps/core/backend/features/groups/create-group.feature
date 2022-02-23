Feature: Get a list of groups

	Scenario: Save group
		When I send a PUT request to "/groups" with body:
		"""
		{
			"id": "0affe324-8d27-11ec-b909-0242ac120002",
			"name": "group test"
		}
		"""	
		Then the response status code should be 201
		And the response should be empty
