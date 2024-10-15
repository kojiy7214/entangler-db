DROP TABLE namespace;
DROP TABLE sheet;
DROP TABLE sheetdefinition;
DROP TABLE value;
DROP TABLE value_tab;
DROP TABLE variable;
DROP TABLE variabletype;
DROP TABLE variable_tab;

DROP TYPE variable_key_array;
DROP TYPE value_key_array;

DROP SEQUENCE namespace_seq;
DROP SEQUENCE variableType_seq;
DROP SEQUENCE variable_seq;
DROP SEQUENCE value_seq;
DROP SEQUENCE sheetDefinition_seq;
DROP SEQUENCE sheet_seq;


CREATE SEQUENCE namespace_seq START WITH 1;
CREATE TABLE namespace
(
  id NUMBER DEFAULT namespace_seq.nextval NOT NULL,
  name NVARCHAR2(4096) NOT NULL,
  status CHAR(3) CHECK (status IN ('USE', 'DEL')),
  timestamp  TIMESTAMP NOT NULL,
  tenant NVARCHAR2(4096) NOT NULL,

  CONSTRAINT namespace_pk PRIMARY KEY(name, timestamp, tenant)
);

CREATE SEQUENCE variableType_seq START WITH 1;
CREATE TABLE variableType
(
  id NUMBER DEFAULT variableType_seq.nextval NOT NULL,
  name NVARCHAR2(4096) NOT NULL,
  status CHAR(3) CHECK (status IN ('USE', 'DEL')),
  timestamp  TIMESTAMP NOT NULL,
  tenant NVARCHAR2(4096) NOT NULL,

  CONSTRAINT variableType_pk PRIMARY KEY(name, timestamp, tenant)
);

CREATE SEQUENCE variable_seq START WITH 1;
CREATE TABLE variable
(
  id NUMBER DEFAULT variable_seq.nextval NOT NULL,
  namespace NUMBER,
  type NUMBER NOT NULL,
  name NVARCHAR2(4096) NOT NULL,
  label JSON,  -- ( "JPN":"ラベル", "USA":"Label" )
  status CHAR(3) CHECK (status IN ('USE', 'DEL')),
  timestamp TIMESTAMP NOT NULL,
  tenant NVARCHAR2(4096) NOT NULL,

CONSTRAINT variable_pk PRIMARY KEY(namespace, name, timestamp, tenant)
);

CREATE SEQUENCE value_seq START WITH 1;
CREATE TABLE value
(
  id NUMBER DEFAULT value_seq.nextval NOT NULL,
  variable NUMBER NOT NULL,
  value JSON,
  timestamp TIMESTAMP NOT NULL, 
  iso3166a3 NCHAR(3 ) ,
  tenant NVARCHAR2(4096) NOT NULL,

CONSTRAINT value_pk PRIMARY KEY(variable, timestamp, iso3166a3, tenant)
);

CREATE TYPE variable_key_array AS TABLE OF NUMBER;
CREATE SEQUENCE sheetDefinition_seq START WITH 1;
CREATE TABLE sheetDefinition
(
  id NUMBER DEFAULT sheetDefinition_seq.nextval NOT NULL,
  name NVARCHAR2(4096) NOT NULL,
  label JSON,  -- ( "JPN":"ラベル", "USA":"Label" )
  variable variable_key_array,
  status CHAR(3) CHECK (status IN ('USE', 'DEL')),
  timestamp TIMESTAMP NOT NULL, 
  tenant NVARCHAR2(4096) NOT NULL,

  CONSTRAINT sheetDefinition_pk PRIMARY KEY(name, timestamp, tenant)
)
NESTED TABLE variable STORE AS variable_tab;

CREATE TYPE value_key_array AS TABLE OF NUMBER;
CREATE SEQUENCE sheet_seq START WITH 1;
CREATE TABLE sheet
(
  id NUMBER DEFAULT sheet_seq.nextval NOT NULL,
  value value_key_array,
  status CHAR(3) CHECK (status IN ('USE', 'DEL')),
  timestamp TIMESTAMP NOT NULL, 
  tenant NVARCHAR2(4096) NOT NULL,

  CONSTRAINT sheet_pk PRIMARY KEY(id, timestamp, tenant)
)
NESTED TABLE value STORE AS value_tab;