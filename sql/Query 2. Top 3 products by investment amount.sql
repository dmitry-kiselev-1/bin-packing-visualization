
-- Query 2: get top 3 products by investment amount
SELECT TOP 3
       p.Name AS ProductName,
       SUM(i.Amount) AS TotalInvestment
FROM Investments i
    JOIN Products p
        ON i.ProductID = p.ID
GROUP BY p.Name
ORDER BY TotalInvestment DESC;
