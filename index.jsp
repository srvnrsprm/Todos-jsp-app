<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="skLibs" prefix="sk" %>
<jsp:useBean id="invntry" type="sk.Invntry" scope="request" />

<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="assets/styles.css" rel="stylesheet" type="text/css">
	<link href="assets/jquery-ui.css" rel="stylesheet" type="text/css"> 
  </head>
  <body>
		<div class="header">
			<img src="assets/imgs/cart-shopping.svg" width="60px" height="60px" style="float:right;" />
			<h1> Shop Bill </h1>
		</div>
		<div class="notify"></div>
		<div class="container">
		<div class="col1">
		<h2>Add a reminder item</h2>
		<form action="javascript:void(0)">
			<textarea name=itmCntnt class=main></textarea><br>
			<div id="dt-errr">Date selected must be in future.</div>
			<input name=evntDt id="evnt-dt"><br>
			<button onClick="addRmndr(this.form)" id="submit">Add Reminder</button><br>
		</form>
		</div>
		<div class="col2">
			<h2>List reminders</h2>
			<div id="rslts">
			<c:forEach varStatus="status" var="rmndr" items="<%= invntry.getRmndrs() %>">
			<div class="ui-widget">
			<table cellpadding=1 cellspacing=3 class="rslt ui-state-highlight ui-corner-all"><tbody>
					<tr>
						<td rowspan=2>${rmndr.itmCntnt}</td>
						<td style="border-bottom:yellow 2px solid"><fmt:formatDate value="${rmndr.evntDt}" pattern="dd MMM yyyy"></fmt:formatDate></td>
						<td id=${rmndr.id} onClick="dltRmndr( ${rmndr.id} )"><img src="assets/imgs/x.svg" width="20px" height="25px"/></td>
					</tr>
					<tr>
						<td><sk:drtn dt="${rmndr.evntDt}"></sk:drtn></td>
						<td><img data-id=${rmndr.id} src="assets/imgs/pencil.svg" width="25px" height="25px" class="edit"/></td>
					</tr>
			</tbody></table>
			</div>
			</c:forEach> 
			</div>
		</div>
		</div>
  </body>
	<script src="assets/jquery.js"></script>
	<script src="assets/jquery-ui.js"></script>
	<script src="assets/app.js"></script>
</html> 
