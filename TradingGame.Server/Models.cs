using TradingGame.Server.Models;

namespace TradingGame.Server
{
    public enum Month
    {
        Jan,
        Feb,
        Mar,
        Apr,
        May,
        Jun,
        Jul,
        Aug,
        Sep,
        Oct,
        Nov,
        Dec
    }

    public class GameData
    {
        public int Year { get; set; }
        public Month Month { get; set; }
        public IReadOnlyCollection<Product> AllProducts { get; set; }


        public GameData()
        {
            AllProducts = [
                new Product { Id = 1, Name = "Apple", MarketPrice = 0.5m },
                new Product { Id = 2, Name = "Banana", MarketPrice = 0.3m },
                new Product { Id = 3, Name = "Orange", MarketPrice = 0.4m },
                new Product { Id = 4, Name = "Peach", MarketPrice = 0.6m },
                new Product { Id = 5, Name = "Pear", MarketPrice = 0.55m },
                new Product { Id = 6, Name = "Plum", MarketPrice = 0.45m },
                new Product { Id = 7, Name = "Strawberry", MarketPrice = 0.7m },
                new Product { Id = 8, Name = "Raspberry", MarketPrice = 0.75m },
                new Product { Id = 9, Name = "Blueberry", MarketPrice = 0.8m },
                new Product { Id = 10, Name = "Blackberry", MarketPrice = 0.85m }
            ];
            Month = Month.Jan;
        }
    }

    public class Player()
    {
        public decimal Funds { get; set; } = 10000;
        public int Level { get; set; } = 1;
        public Shelf[] Shelves { get; set; } = new Shelf[4];

    }

    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal MarketPrice { get; set; }
    }

    public class Shelf(int id, Product? product, int quantity)
    {
        public int Id { get; set; } = id;
        public Product? Product { get; set; } = product;
        public int Quantity { get; set; } = quantity;
    }
}
