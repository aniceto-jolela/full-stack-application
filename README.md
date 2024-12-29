# full-stack-application
Task: Build a full-stack application to manage a user directory.

> Requirements:

- A frontend using React with Material-UI:
- A login
- A form to add a user (name, email, role).
- A table to list all users.
- A backend using Django:
- APIs for CRUD operations on users.
- Store user data in a PostgreSQL database.
- Implement basic security:
- CSRF protection.
- Validate input to prevent SQL injection.

#

> Steps
1. install PostgreSQL
    ```bash
      sudo apt install postgresql   
    ```

    ```bash
    psql --version
    ```
2. install Psycopg (to CPython)
   - tip -> Database adapter
   ```bash
      pip install "psycopg[binary]"
    ```
3. install Dotenv
   ```bash
      pip install python-dotenv
    ```



#
> Versions
>> python 3.12.4 
>>
>> postgresql 14.5
>> 
>> pip 24.3.1
>>
>> psycopg 3.2.3
>>
>> psycopg-binary 3.2.3
>>
>> python-dotenv 1.0.1
 




