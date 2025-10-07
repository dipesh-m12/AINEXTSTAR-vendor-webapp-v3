"use client";
import { useState, useEffect, useMemo } from "react";
import {
  Package,
  AlertTriangle,
  XCircle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  product_id: string;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  is_active: boolean;
  remainingStock: number;
}

interface ProductApiResponse {
  results: Product[];
}

const getStatusBadge = (stock: number) => {
  if (stock === 0)
    return (
      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 text-xs">
        out of stock
      </Badge>
    );
  if (stock < 10)
    return (
      <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 text-xs">
        low stock
      </Badge>
    );
  return (
    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 text-xs">
      in stock
    </Badge>
  );
};

const getStockBar = (percentage: number, stock: number) => {
  const barColor =
    stock === 0 ? "bg-red-400" : stock < 10 ? "bg-orange-400" : "bg-lime-400";
  return (
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all ${barColor}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const ProductCard = ({ item }: { item: Product & { percentage: number } }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 text-sm leading-tight">
                {item.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{item.description}</p>
            </div>
            <div className="ml-2 shrink-0">
              {getStatusBadge(item.stock_quantity)}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Stock Level</span>
              <span className="text-xs text-gray-500">{item.percentage}%</span>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-gray-700">
                {item.stock_quantity} / 100
              </div>
              {getStockBar(item.percentage, item.stock_quantity)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 block text-xs">Unit Cost</span>
              <span className="font-medium text-gray-900">
                ${(parseFloat(item.price) / 100).toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-gray-600 block text-xs">Retail Price</span>
              <span className="font-medium text-gray-900">
                ${((parseFloat(item.price) / 100) * 1.5).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Restock
            </Button>
            <Button size="sm" variant="outline" className="flex-1 h-8 text-xs">
              <ShoppingCart className="h-3 w-3 mr-1" />
              Sell
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        "https://rizzerv.kloudwizards.com/gateway/search/products",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({}),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch products");
      const data: ProductApiResponse = await response.json();
      setProducts(data.results.filter((p) => p.is_active));
    } catch {
      setError("Failed to fetch products. Please try again later.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const statusCounts = useMemo(() => {
    return products.reduce(
      (counts, item) => {
        const status =
          item.stock_quantity === 0
            ? "out of stock"
            : item.stock_quantity < 10
            ? "low stock"
            : "in stock";
        counts[status] = (counts[status] || 0) + 1;
        return counts;
      },
      { "in stock": 0, "low stock": 0, "out of stock": 0 } as Record<
        string,
        number
      >
    );
  }, [products]);

  const filteredData = useMemo(() => {
    let filtered = products.map((p) => ({
      ...p,
      percentage: Math.min((p.stock_quantity / 100) * 100, 100),
    }));
    if (activeTab !== "all") {
      filtered = filtered.filter((item) => {
        const status =
          item.stock_quantity === 0
            ? "out of stock"
            : item.stock_quantity < 10
            ? "low stock"
            : "in stock";
        return status === activeTab;
      });
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filtered;
  }, [activeTab, searchTerm, products]);

  const totalProducts = products.length;
  const lowStockItems = statusCounts["low stock"] || 0;
  const outOfStockItems = statusCounts["out of stock"] || 0;
  const totalValue = products.reduce(
    (sum, item) => sum + (parseFloat(item.price) / 100) * item.stock_quantity,
    0
  );

  const tabs = [
    { key: "all", label: "All Products", count: totalProducts },
    { key: "low stock", label: "Low Stock", count: lowStockItems },
    { key: "out of stock", label: "Out of Stock", count: outOfStockItems },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-4 sm:px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="truncate">Inventory Management</span>
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm mt-1">
              Track stock levels and manage supplies
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 ml-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9 hidden sm:flex"
            >
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              Reports
            </Button>
            <Button
              size="sm"
              className="bg-lime-500 hover:bg-lime-600 text-white flex items-center gap-2 text-xs sm:text-sm h-8 sm:h-9"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Total Products
              </CardTitle>
              <Package className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? "..." : totalProducts}
              </div>
              <p className="text-xs text-gray-500 mt-1">Active items</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Low Stock
              </CardTitle>
              <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-orange-500 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                {loading ? "..." : lowStockItems}
              </div>
              <p className="text-xs text-gray-500 mt-1">Need reorder</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Out of Stock
              </CardTitle>
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold text-red-600">
                {loading ? "..." : outOfStockItems}
              </div>
              <p className="text-xs text-gray-500 mt-1">Critical items</p>
            </CardContent>
          </Card>
          <Card className="hover:shadow-sm transition-shadow col-span-2 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate">
                Total Value
              </CardTitle>
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 shrink-0" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">
                {loading ? "..." : `$${totalValue.toFixed(2)}`}
              </div>
              <p className="text-xs text-gray-500 mt-1">Inventory worth</p>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col xl:flex-row gap-4 xl:items-center xl:justify-between">
          <div className="inline-flex rounded-2xl bg-gray-200 p-1 gap-1">
            {tabs.map((tab) => (
              <Button
                key={tab.key}
                variant="ghost"
                size="sm"
                onClick={() => setActiveTab(tab.key)}
                className={`${
                  activeTab === tab.key
                    ? "bg-white text-gray-900 shadow-sm hover:bg-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                } text-xs sm:text-sm h-8 sm:h-9 whitespace-nowrap shrink-0 rounded-xl px-3 sm:px-4 transition-colors font-medium`}
              >
                {tab.label} ({tab.count})
              </Button>
            ))}
          </div>
          <div className="relative w-full xl:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 sm:h-10 bg-gray-50 border-gray-200 focus:bg-white rounded-lg"
            />
          </div>
        </div>
        <div className="block xl:hidden">
          <div className="space-y-4">
            {loading ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">Loading products...</p>
                </CardContent>
              </Card>
            ) : filteredData.length > 0 ? (
              filteredData.map((item) => (
                <ProductCard key={item.product_id} item={item} />
              ))
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    No products found matching your criteria
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        <div className="hidden xl:block">
          <Card className="overflow-hidden">
            <div className="overflow-x-auto ml-2.5">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Product
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Description
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Stock Level
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Unit Cost
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Retail Price
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-gray-800 bg-white h-14 text-sm w-32">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        Loading products...
                      </TableCell>
                    </TableRow>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((item) => (
                      <TableRow
                        key={item.product_id}
                        className="hover:bg-gray-50 border-b border-gray-100"
                      >
                        <TableCell className="py-5">
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {item.name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 py-5 text-sm">
                          {item.description}
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="space-y-2 min-w-[140px]">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 font-medium">
                                {item.stock_quantity} / 100
                              </span>
                              <span className="text-gray-500 text-xs">
                                {item.percentage}%
                              </span>
                            </div>
                            {getStockBar(item.percentage, item.stock_quantity)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 py-5 text-sm">
                          ${(parseFloat(item.price) / 100).toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium text-gray-900 py-5 text-sm">
                          ${((parseFloat(item.price) / 100) * 1.5).toFixed(2)}
                        </TableCell>
                        <TableCell className="py-5">
                          {getStatusBadge(item.stock_quantity)}
                        </TableCell>
                        <TableCell className="py-5">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-gray-500"
                      >
                        No products found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
