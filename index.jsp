<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="skLibs" prefix="sk" %>
<jsp:useBean id="invntry" type="sk.Invntry" scope="request" />

<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="styles.css" rel="stylesheet" type="text/css">
  </head>
  <body>
		<h1> Shop Bill</h1>
		<form action="javascript:void(0)">
			<textarea name=itmCntnt></textarea>
			<div id="dt-errr">Date selected must be in future.</div>
			<input type=date name=evntDt>
			<button onClick="addRmndr(this.form)">Add Reminder</button>	
		</form>
		<div id=rslts>
			<c:forEach varStatus="status" var="rmndr" items="<%= invntry.getRmndrs() %>">
			<table><tbody>
					<tr><td rowspan=2>${rmndr.itmCntnt}</td>
						<td style="border-bottom:yellow 2px solid"><fmt:formatDate value="${rmndr.evntDt}" pattern="dd MMM yyyy"></fmt:formatDate></td>
						<td id=${status.count} onClick="dltRmndr( ${status.count} )">&nbsp;&nbsp;&nbsp;x&nbsp;&nbsp;&nbsp;</td>
					</tr>
					<tr><td><sk:drtn dt="${rmndr.evntDt}"></sk:drtn></td></tr>
			</tbody></table>
			</c:forEach> 
		</div>
  </body>
	<script src="app.js"></script>
</html> 
