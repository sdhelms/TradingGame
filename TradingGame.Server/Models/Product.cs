namespace TradingGame.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public decimal MarketPrice { get; set; }
    }
}
