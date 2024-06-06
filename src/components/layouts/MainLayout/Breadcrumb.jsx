import { Breadcrumb as AntdBreadcrumb } from "antd";
import cx from "classnames";
import React, { useMemo } from "react";

const Breadcrumb = ({ className = "", breadcrumb = [] }) => {
  const renderBreadcrumb = useMemo(() => {
    if (breadcrumb.length > 0) {
      return (
        <AntdBreadcrumb
          className={cx(className)}
          items={breadcrumb.map((item) => {
            if (item.link) {
              return {
                title: <a href={item.link}>{item.title}</a>,
              };
            }
            return {
              title: item.title,
            };
          })}
        />
      );
    }

    return <React.Fragment />;
  }, [breadcrumb, className]);

  return renderBreadcrumb;
};

export default Breadcrumb;
