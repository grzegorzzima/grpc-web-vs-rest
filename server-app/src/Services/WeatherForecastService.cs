using Google.Protobuf.WellKnownTypes;
using Grpc.Core;

namespace SimpleGrpcService.Services;

public class WeatherForecastService : WeatherForecast.WeatherForecastBase
{
    private static readonly string[] Summaries =
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastService> _logger;
    
    public WeatherForecastService(ILogger<WeatherForecastService> logger)
    {
        _logger = logger;
    }

    public override async Task GetWeatherStream(Empty request, IServerStreamWriter<WeatherData> responseStream, ServerCallContext context)
    {
        var rng = new Random();
        var now = DateTime.UtcNow;

        var i = 0;
        while (!context.CancellationToken.IsCancellationRequested && i < 20)
        {
            await Task.Delay(500); // Gotta look busy
            
            var forecast = new WeatherData
            {
                DateTimeStamp = Timestamp.FromDateTime(now.AddDays(i++)),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            };

            _logger.LogInformation("Sending WeatherData response");

            await responseStream.WriteAsync(forecast);        
        }
    }
}
