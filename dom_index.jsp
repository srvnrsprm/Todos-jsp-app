<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="skLibs" prefix="sk" %>
<jsp:useBean id="invntry" type="sk.Invntry" scope="request" />

<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="assets/styles.css" rel="stylesheet" type="text/css">
  </head>
  <body>
		<div class="header">
			<img src="assets/imgs/cart-shopping.svg" width="60px" height="60px" style="float:right;" />
			<h1> Todos App </h1>
		</div>
		<div class="notify"></div>
		<div class="container">
		<div class="col1">
		<h2>Add a reminder item</h2>
		<form action="javascript:void(0)">
			<textarea name=itmCntnt class=main></textarea><br>
			<div id="dt-errr">Date selected must be in future.</div>
			<input name=evntDt id="evnt-dt" type="date"><br>
			<button onClick="addRmndr(this.form)" id="submit">Add Reminder</button><br>
		</form>
		</div>
		<div class="col2">
			<h2>List reminders</h2>
			<div id="rslts">
			</div>
		</div>
		</div>
  </body>
	<script src="assets/dom.enhancer.js"></script> 
	<script src="assets/app.dom.js"></script> 
</html> 
