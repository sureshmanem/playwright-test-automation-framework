Feature: Login Functionality
  As a user of the application
  I want to be able to log in with valid credentials
  So that I can access secure areas of the site

  Background:
    Given I navigate to "https://the-internet.herokuapp.com/login"

  Scenario: Successful login with valid credentials
    When I enter "tomsmith" in "UsernameInput" on "LoginPage"
    And I enter "SuperSecretPassword!" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then the page URL should contain "secure"
    And "FlashMessage" should contain text "You logged into a secure area!" on "SecurePage"
    And "LogoutButton" should be visible on "SecurePage"

  Scenario: Failed login with invalid username
    When I enter "invaliduser" in "UsernameInput" on "LoginPage"
    And I enter "SuperSecretPassword!" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then "FlashMessage" should contain text "Your username is invalid!" on "LoginPage"

  Scenario: Failed login with invalid password
    When I enter "tomsmith" in "UsernameInput" on "LoginPage"
    And I enter "wrongpassword" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then "FlashMessage" should contain text "Your password is invalid!" on "LoginPage"

  Scenario: Successful logout after login
    When I enter "tomsmith" in "UsernameInput" on "LoginPage"
    And I enter "SuperSecretPassword!" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    And I click "LogoutButton" on "SecurePage"
    Then the page URL should contain "login"
    And "FlashMessage" should contain text "You logged out of the secure area!" on "LoginPage"
