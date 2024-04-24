import React, { useState, useRef } from "react";
import {
  TableContainer as Container,
  Table,
  TableHead as Head,
  TableBody as Body,
  TableRow as Row,
  TableCell as Cell,
  makeStyles,
} from "@material-ui/core";
import { isFunction } from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  cellDense: {
    padding: "0 10px",
    minHeight: "52px",
    maxHeight: "52px",
    lineHeight: "52px",
  },
  tableContainer: {
    top: 30,
    left: 30,
    height: "400px",
    width: "1600px",
    overflow: "auto",
    position: "relative",
  },
}));

const DataTable = ({
  columns = [],
  data = [],
  rowIDKey = "id",
  totals = [],
}) => {
  const classNames = useStyles();
  const shownColumns = columns.filter((col) => !col?.hide);
  const containerRef = useRef(null);

  const columnTotals = data.reduce(
    (acc, curr) => {
      totals.forEach((total) => {
        acc[total] += curr[total];
      });

      return acc;
    },
    totals.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
    }, {})
  );

  function getCellValue(col, row, id, value) {
    if (col.hasOwnProperty("valueFormatter") && isFunction(col.valueFormatter))
      return col.valueFormatter({ row, id, value });

    return value;
  }

  const [itemsToShow, setItemsToShow] = useState(10);

  const loadMoreItems = () => {
    setItemsToShow((prevItems) => prevItems + 5);
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container.scrollTop === 0) {
      // Scrolling up
      setItemsToShow((prevItems) => Math.max(prevItems - 10, 10));
    } else if (
      container.scrollTop + container.clientHeight ===
      container.scrollHeight
    ) {
      // Scrolling down
      loadMoreItems();
    }
  };

  return (
    <Container
      id="parent"
      className={classNames.tableContainer}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <Table>
        <Head>
          <Row>
            {shownColumns.map((col, index) => (
              <Cell
                key={col.field}
                className={classNames.cellDense}
                style={{
                  textAlign: col?.headerAlign || "left",
                  minWidth: col?.width || 300,
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#ddd",
                  zIndex: index === 0 ? 15 : 10,
                  left: 0,
                }}
              >
                {col.headerName}
              </Cell>
            ))}
          </Row>
        </Head>
        <Body style={{ height: 40 }}>
          {data.slice(0, itemsToShow).map((item) => (
            <Row key={item[rowIDKey]}>
              {shownColumns.map((col, index) => (
                <Cell
                  key={col.field}
                  className={classNames.cellDense}
                  style={{
                    textAlign: col?.align || "left",
                    minWidth: col?.width || 100,
                    maxWidth: col?.width || 100,
                    position: index === 0 ? "sticky" : "static",
                    backgroundColor: index === 0 ? "#ddd" : "inherit",
                    left: 0,
                    zIndex: 5,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                  }}
                >
                  {getCellValue(col, item, item[rowIDKey], item[col.field])}
                </Cell>
              ))}
            </Row>
          ))}
          {totals.length > 0 && (
            <Row style={{ height: 52 }}>
              {shownColumns.map((col, index) => (
                <Cell
                  key={col.field}
                  className={classNames.cellDense}
                  style={{
                    textAlign: col?.align || "left",
                    fontWeight: 700,
                    minWidth: col?.width || 100,
                    left: 0,
                    position: "sticky",
                    bottom: -1,
                    backgroundColor: "#ddd",
                    zIndex: index === 0 ? 15 : 10,
                  }}
                >
                  {index === 0 ? "Total" : ""}
                  {totals.includes(col.field)
                    ? getCellValue(col, {}, 0, columnTotals[col.field])
                    : ""}
                </Cell>
              ))}
            </Row>
          )}
        </Body>
      </Table>
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreItems}
        hasMore={itemsToShow < data.length}
        scrollableTarget="parent"
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.8}
      />
    </Container>
  );
};

export default React.memo(DataTable);
