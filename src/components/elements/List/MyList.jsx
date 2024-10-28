import { Avatar, Checkbox, Divider, List, Skeleton } from "antd";
import { useEffect, useState, useCallback } from "react"; // Fix the import here
import InfiniteScroll from "react-infinite-scroll-component";

const MyList = ({ height = "", data = [], totalDataCount, boolean, onCheckboxChange, isLoading }) => {
  const [loading, setLoading] = useState(false);

  const getColorForLevel = (level) => {
    switch (level) {
      case "GRADE1":
        return "#FFFF33";
      case "GRADE2":
        return "#FF9933";
      case "GRADE3":
        return "#FF0033";
      case "ISOLATED":
        return "FF00FF";
      default:
        return "000000";
    }
  };

  const getColorBOrW = (boolean) => {
    if (boolean) {
      return "#000000";
    } else {
      return "#FFFFFF";
    }
  };

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (data.length >= totalDataCount) {
      setLoading(false);
      return;
    }
  }, [data, loading, totalDataCount]);

  useEffect(() => {
    loadMoreData();
  }, [loadMoreData]);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: height,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < totalDataCount}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>No More</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          loading={isLoading}
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              key={item.email}
              style={{
                backgroundColor: getColorForLevel(item.level),
                fontWeight: "bold",
                fontSize: "1.1rem",
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.pictureUrl}
                    size={48}
                    style={{ marginLeft: "1rem" }}
                  />
                }
                title={
                  <div style={{ color: getColorBOrW(boolean), marginLeft: 0 }}>
                    {item.firstName} {item.lastName} ( {item.hospitalNumber} )
                  </div>
                }
              />
              <div style={{ color: getColorBOrW(boolean), marginRight: "1rem" }}>
                {item.phoneNumber}{" | "}
                <Checkbox checked={item.verified}
                  onChange={() => onCheckboxChange(!item.verified, item.id)}
                />
              </div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};

export default MyList;
