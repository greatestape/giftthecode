Lime Survey With Enhanced Accessibility
=======================================

This project includes a docker compose file to help get lime survey set up, and
a template to enhance the accessibility of the survey. 

How to Install
--------------

- (Optional) modify `limesurvey-compose.yml`
  - Change local port if port 80 shouldn't be used
  - Add a `volumes` section to map the mysql and upload dirs to specific
    locations
- Run `docker compose -f limesurvey-compose.yml up -d`
- Go to http://localhost:80 (or whatever port you chose)
- Set up Lime Survey
  - Database location: `localhost`
  - Database user: root
  - Database password: blank
  - Database name: limesurvey
  - Table prefix: `lime_`
- Let Lime Survey generate the database

Importing Accessibility Theme
-----------------------------

- Navigate to Lime Survey admin page: http://localhost:80/index.php/admin
- Click on "Template Editor"
- Click on "Import"
- Select the accessibility.zip file in the project
