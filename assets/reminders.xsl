<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <!-- <xsl:template match="invntry">
		<xsl:apply-templates select="rmndr" />
  </xsl:template> -->
	<xsl:template match="rmndr">
	  <div class="ui-widget">
		<table cellpadding="1" cellspacing="3" class="rslt ui-state-highlight ui-corner-all "><tbody>
          <tr>
            <td rowspan="2"><xsl:value-of select="itmCntnt" /></td>
            <td style="border-bottom:yellow 2px solid"><xsl:value-of select="dtTxt"/></td>
						<xsl:element name="td">
							<xsl:attribute name="id"><xsl:value-of select="id" /></xsl:attribute>
							<xsl:attribute name="onClick">dltRmndr( <xsl:value-of select="id" /> )</xsl:attribute>
							<img src="assets/imgs/x.svg" width="20px" height="25px" />
						</xsl:element>
          </tr>
          <tr>
            <td><xsl:value-of select="drtn" /></td>
            <td>
							<xsl:element name="img">
								<xsl:attribute name="src">assets/imgs/pencil.svg</xsl:attribute>
								<xsl:attribute name="width">25px</xsl:attribute>
								<xsl:attribute name="height">25px</xsl:attribute>
								<xsl:attribute name="class">edit</xsl:attribute>
								<xsl:attribute name="data-id"><xsl:value-of select="id" /></xsl:attribute>
							</xsl:element>
						</td>
          </tr>
     </tbody>
		</table>
		</div>
	</xsl:template>
</xsl:stylesheet>  
