namespace TradingGame.Server.Models
{
    public class Shelf(int id, Product? product, int quantity)
    {
        public int Id { get; set; } = id;
        public Product? Product { get; set; } = product;
        public int Quantity { get; set; } = quantity;
    }
}
