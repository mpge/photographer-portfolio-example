<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    
    <!-- Primary CSS -->
    <link href="/css/app.css" type="text/css" rel="stylesheet" />
    
    <!-- Vendor Assets -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/pure/2.0.3/pure-min.css" type="text/css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
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