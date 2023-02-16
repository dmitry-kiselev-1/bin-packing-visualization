
-- Procedure 2: get clients and products invested more than a given amount
CREATE PROCEDURE dbo.GetInvestmentsOverAmount @Amount DECIMAL(18, 2)
AS
BEGIN
    SELECT c.Name AS ClientName,
           p.Name AS ProductName
    FROM Investments i
        JOIN Clients c
            ON i.ClientID = c.ID
        JOIN Products p
            ON i.ProductID = p.ID
    WHERE i.Amount > @Amount
    GROUP BY c.Name,
             p.Name;
END;
