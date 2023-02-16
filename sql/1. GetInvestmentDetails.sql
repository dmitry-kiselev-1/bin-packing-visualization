
-- Procedure 1: get product and client names for a given investment ID
CREATE PROCEDURE dbo.GetInvestmentDetails @InvestmentID INT
AS
BEGIN
    SELECT p.Name AS ProductName,
           c.Name AS ClientName
    FROM Investments i
        JOIN Clients c
            ON i.ClientID = c.ID
        JOIN Products p
            ON i.ProductID = p.ID
    WHERE i.ID = @InvestmentID;
END;
