
-- Query 1: get total investment amount for each client
SELECT c.Name AS ClientName,
       SUM(i.Amount) AS TotalInvestment
FROM Investments i
    JOIN Clients c
        ON i.ClientID = c.ID
GROUP BY c.Name;
