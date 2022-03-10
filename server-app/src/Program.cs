using SimpleGrpcService.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddGrpc();
builder.Services.AddCors(o => o.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader()
               .WithExposedHeaders("Grpc-Status", "Grpc-Message", "Grpc-Encoding", "Grpc-Accept-Encoding");
    }));

var app = builder.Build();

app.UseRouting();
//Adds grpc-web middlewares 
app.UseGrpcWeb(new GrpcWebOptions() { DefaultEnabled = true });
app.UseCors();
// Configure the HTTP request pipeline.
app.MapGrpcService<WeatherForecastService>().RequireCors("AllowAll");
app.MapGrpcService<GreeterService>().RequireCors("AllowAll");

app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

app.Run();
