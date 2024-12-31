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
4. login in the postgresql shell
   ```bash
   sudo -u postgres psql
   ```
5. Connection pools
   ```shell
   pip install "psycopg[pool]"
   ```
6. Rest
   ```shell
   pip install djangorestframework
   ```




#
 > Versions
>> python 3.12.4 <br/>
>> postgresql 14.5 <br/>
>> pip 24.3.1 <br/>
>> psycopg 3.2.3 <br/>
>> psycopg-binary 3.2.3 <br/>
>> python-dotenv 1.0.1 <br/>
>> psycopg-pool 3.2.4 <br/>
>> djangorestframework 3.15.2 <br/>
>> markdown-3.7 <br/>
>> django-filter-24.3 <br/>



 ## References
##### Backend
[django](https://docs.djangoproject.com/) <br/>
[postgressql](https://www.postgresql.org) <br/>
[psycopg](https://www.psycopg.org) <br/>
[drf](https://www.django-rest-framework.org/) <br/>
[python](https://docs.python.org) <br/>


##### Frontend
[react]() <br/>


