-- Create Clients table
CREATE TABLE dbo.Clients
(
    ID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

-- Populate Clients table with test data
INSERT INTO dbo.Clients
(
    ID,
    Name
)
VALUES
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Bob Johnson');

-- Create Products table
CREATE TABLE dbo.Products
(
    ID INT PRIMARY KEY,
    Name VARCHAR(50) NOT NULL
);

-- Populate Products table with test data
INSERT INTO dbo.Products
(
    ID,
    Name
)
VALUES
(1, 'Stocks'),
(2, 'Bonds'),
(3, 'Real Estate');

-- Create Investments table
CREATE TABLE dbo.Investments
(
    ID INT PRIMARY KEY,
    ClientID INT NOT NULL,
    ProductID INT NOT NULL,
    Amount DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (ClientID) REFERENCES Clients (ID),
    FOREIGN KEY (ProductID) REFERENCES Products (ID)
);

-- Populate Investments table with test data
INSERT INTO dbo.Investments
(
    ID,
    ClientID,
    ProductID,
    Amount
)
VALUES
(1, 1, 1, 1000.00),
(2, 1, 2, 5000.00),
(3, 2, 1, 2000.00),
(4, 3, 3, 10000.00),
(5, 3, 2, 7500.00),
(6, 2, 3, 3000.00);


