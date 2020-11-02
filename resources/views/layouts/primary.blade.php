<!DOCTYPE html>
<html lang="en" class="loading">
  <head>
    <title>Photography Portfolio</title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet">
    
    <!-- Primary CSS -->
    <link href="/css/app.css" type="text/css" rel="stylesheet" />
    
    <!-- Vendor Assets -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.3/pure-min.css" type="text/css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <div class="randomBackground"><div class="innerRandomBackground"></div></div>
    
    <div id="pageContainer" class="photographer-portfolio-page {{ isset($pageClass) ? $pageClass : '' }}">
      @yield('content')
    </div>
    
    <script src="/js/app.js" type="text/javascript"></script>
    <script type="text/javascript">
      if(typeof photographerPortfolio != 'undefined') {
        photographerPortfolio.verbose = true;
        photographerPortfolio.init(); // start.
      }
    </script>
  </body>
</html>