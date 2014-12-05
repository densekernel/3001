<?php include('header.php'); ?>
    <body>
        <div class="container">
	    	<div class="row">
	        	<!-- Include nav in col-md-2 -->
                <?php include('nav.php'); ?>
                <!-- Include content in col-md-10 -->
	        	<div class="col-md-10">
	        		<h1>COMP3001</h1>
	        		<h2>Technology Management and Professional Issues</h2>
                    <h3>Click here to see our gantt chart</h3>
                    <div class="back-button"><a href="plan/projectplan.html">Gantt Chart</a></div>

                    <h2>Analytics Application and Data Visualsiations</h2>
                    <ul>
                        <li>We acquired and analysed multiple data sources</li>
                        <li>This big data is analysed to detect network anomalies</li>
                        <li>We built data visualisations to show bicycles availability</li>
                        <li>We show the effect engineering works has on availability</li>
                    </ul>
                    <h3>Final Product</h3>
                    <p>This image shows how TFL could use our data visualisations to map tube closures on the District Line and Northern Line.</p>
                    <div class="back-button"><a href="http://bl.ocks.org/nicola/raw/dd4a05e46d6452a7b787/">Live example</a></div>
                    <img src="img/case1.png">
	        	</div>
	    	</div>
        </div>

        <!-- Google Fonts Script -->
        	<script type="text/javascript">
        	  WebFontConfig = {
        	    google: { families: [ 'Open+Sans:400italic,400,300,700:latin' ] }
        	  };
        	  (function() {
        	    var wf = document.createElement('script');
        	    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        	      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
        	    wf.type = 'text/javascript';
        	    wf.async = 'true';
        	    var s = document.getElementsByTagName('script')[0];
        	    s.parentNode.insertBefore(wf, s);
        	  })(); 
        	</script>
    </body>
</html>
