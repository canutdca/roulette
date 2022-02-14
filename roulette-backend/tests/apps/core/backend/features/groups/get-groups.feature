Feature: Get a list of groups

	Scenario: Get a valid list of groups
		When I send a GET request to "/groups"
		Then the response status code should be 200
		And the response should not be empty
