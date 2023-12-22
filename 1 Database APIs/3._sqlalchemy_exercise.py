######################################
# SQL Alchemy ORM: exercise
# 1. Migrate the fields EmployeeID, LastName, FirstName, Title, BirthDate and Salary from the table Employee from MS-SQL Server to a newly created table in Northwind database
# 2. Make sure you only migrate the records where there is mentioned a salary
# 3. Make sure this script can be ran multiple times (meaning: deleting records of migrated table before migrating again)
# 4. You can use https://docs.sqlalchemy.org/en/20/orm/quickstart.html for reference
######################################

## SOLUTION

######################################
# SQL Alchemy ORM 
######################################  

from sqlalchemy import create_engine, func, Table, MetaData, desc
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy import select, delete
from pandas import isna

# initialization of MS SQL Server database connection xtreme
xtreme_engine = create_engine('mssql+pyodbc://localhost/xtreme?trusted_connection=yes&driver=ODBC+Driver+18+for+SQL+Server')
xtreme_conn = xtreme_engine.connect()
xtreme_metadata = MetaData()  
xtreme_Base = declarative_base() # initialize Base class
xtreme_Base.metadata.reflect(xtreme_engine)   # get metadata from database
   
class xtreme_Employee(xtreme_Base):  # each table is a subclass from the xtreme_ class
    __tablename__ = 'Employee';
    
Session = sessionmaker(bind=xtreme_engine)
xtreme_session = Session()

# initialization of MS SQL Server database connection Northwind 
northwind_engine = create_engine('mssql+pyodbc://localhost/Northwind?trusted_connection=yes&driver=ODBC+Driver+18+for+SQL+Server')
northwind_conn = northwind_engine.connect()
northwind_metadata = MetaData()  

northwind_Base = declarative_base() # initialize Base class
northwind_Base.metadata.reflect(northwind_engine)   # get metadata from database

class northwind_Employee(northwind_Base):  # each table is a subclass from the Base class
    __tablename__ = 'Employee_migrated';
  
Session = sessionmaker(bind=northwind_engine)
northwind_session = Session()

# first delete all records from the migrated table so we can rerun the program
stmt = delete(northwind_Employee)
northwind_session.execute(stmt)
northwind_session.commit()


# sqlalchemy query to establish right records to migrate
emps = xtreme_session.query(xtreme_Employee.EmployeeID, xtreme_Employee.LastName, xtreme_Employee.FirstName, xtreme_Employee.Title, 
                            xtreme_Employee.BirthDate, xtreme_Employee.Salary).filter(xtreme_Employee.Salary.isnot(None))

# add records to Norhtwind database
print('')
print ('*** SQL Alchemy ORM ***')
for emp in emps:
    print('ID = ' + str(emp.EmployeeID) + ', '  + 'Name = ' + emp.LastName + ' ' + emp.FirstName + ', salary = ' + str(emp.Salary))
    northwind_session.add(northwind_Employee(EmployeeID = emp.EmployeeID, LastName = emp.LastName, FirstName = emp.FirstName, 
                                             Title = emp.Title, BirthDate = emp.BirthDate, Salary = emp.Salary))

xtreme_conn.close()
xtreme_session.close()

northwind_conn.close()
northwind_session.close()


    
    